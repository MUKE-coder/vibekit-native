import React from 'react';
import { View, Text, ScrollView, Pressable, type LayoutChangeEvent } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cn } from '../lib/utils';
import { colors } from '../lib/theme';

export type SortDirection = 'asc' | 'desc';

export interface Column<T> {
  key: keyof T & string;
  header: string;
  /** Fixed column width in px. Required when total table width exceeds viewport. */
  width: number;
  align?: 'left' | 'center' | 'right';
  /** Disable sorting on this column. */
  unsortable?: boolean;
  /** Custom renderer for the cell. */
  render?: (row: T, index: number) => React.ReactNode;
}

interface DataTableProps<T extends Record<string, unknown>> {
  columns: Column<T>[];
  rows: T[];
  /** Stable id extractor. */
  keyExtractor: (row: T, index: number) => string;
  onRowPress?: (row: T, index: number) => void;
  /** Initial sort state. */
  initialSort?: { key: keyof T & string; direction: SortDirection };
  /** Empty state copy. */
  emptyText?: string;
  className?: string;
}

/**
 * Horizontally scrollable, sortable data table for mobile dashboards.
 * Renders sticky header + scrollable rows. Avoid >7 columns on mobile.
 */
export function DataTable<T extends Record<string, unknown>>({
  columns,
  rows,
  keyExtractor,
  onRowPress,
  initialSort,
  emptyText = 'No data',
  className,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = React.useState<(keyof T & string) | null>(
    initialSort?.key ?? null,
  );
  const [sortDir, setSortDir] = React.useState<SortDirection>(initialSort?.direction ?? 'asc');
  const [containerWidth, setContainerWidth] = React.useState(0);

  function toggleSort(key: keyof T & string) {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  }

  const totalWidth = React.useMemo(
    () => columns.reduce((sum, c) => sum + c.width, 0),
    [columns],
  );
  const needsScroll = totalWidth > containerWidth;

  const sortedRows = React.useMemo(() => {
    if (!sortKey) return rows;
    const sorted = [...rows].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      if (av == null && bv == null) return 0;
      if (av == null) return 1;
      if (bv == null) return -1;
      if (typeof av === 'number' && typeof bv === 'number') return av - bv;
      return String(av).localeCompare(String(bv), undefined, { numeric: true });
    });
    return sortDir === 'asc' ? sorted : sorted.reverse();
  }, [rows, sortKey, sortDir]);

  function onLayout(e: LayoutChangeEvent) {
    setContainerWidth(e.nativeEvent.layout.width);
  }

  const content = (
    <View style={{ width: needsScroll ? totalWidth : '100%' }}>
      {/* Header */}
      <View className="flex-row border-b border-border bg-bgSubtle">
        {columns.map((col) => {
          const sortable = !col.unsortable;
          const active = sortKey === col.key;
          return (
            <Pressable
              key={col.key}
              onPress={() => sortable && toggleSort(col.key)}
              disabled={!sortable}
              style={{ width: col.width }}
              className="px-3 py-3"
              accessibilityRole={sortable ? 'button' : undefined}
              accessibilityLabel={sortable ? `Sort by ${col.header}` : col.header}
            >
              <View
                className={cn(
                  'flex-row items-center gap-1',
                  col.align === 'right' && 'justify-end',
                  col.align === 'center' && 'justify-center',
                )}
              >
                <Text className="text-textTertiary text-[11px] uppercase tracking-widest font-medium">
                  {col.header}
                </Text>
                {sortable ? (
                  <Ionicons
                    name={active ? (sortDir === 'asc' ? 'arrow-up' : 'arrow-down') : 'swap-vertical'}
                    size={12}
                    color={active ? colors.accent : colors.textTertiary}
                  />
                ) : null}
              </View>
            </Pressable>
          );
        })}
      </View>

      {/* Rows */}
      {sortedRows.length === 0 ? (
        <View className="px-3 py-8 items-center">
          <Text className="text-textTertiary text-[13px]">{emptyText}</Text>
        </View>
      ) : (
        sortedRows.map((row, i) => {
          const RowContainer = onRowPress ? Pressable : View;
          return (
            <RowContainer
              key={keyExtractor(row, i)}
              onPress={() => onRowPress?.(row, i)}
              className={cn(
                'flex-row',
                i !== sortedRows.length - 1 && 'border-b border-border',
              )}
              android_ripple={onRowPress ? { color: colors.bgHover } : undefined}
            >
              {columns.map((col) => (
                <View
                  key={col.key}
                  style={{ width: col.width }}
                  className={cn(
                    'px-3 py-3.5',
                    col.align === 'right' && 'items-end',
                    col.align === 'center' && 'items-center',
                  )}
                >
                  {col.render ? (
                    col.render(row, i)
                  ) : (
                    <Text className="text-textPrimary text-[13.5px]" numberOfLines={1}>
                      {String(row[col.key] ?? '—')}
                    </Text>
                  )}
                </View>
              ))}
            </RowContainer>
          );
        })
      )}
    </View>
  );

  return (
    <View
      className={cn('rounded-2xl border border-border bg-bgElevated overflow-hidden', className)}
      onLayout={onLayout}
    >
      {needsScroll ? (
        <ScrollView horizontal showsHorizontalScrollIndicator>
          {content}
        </ScrollView>
      ) : (
        content
      )}
    </View>
  );
}
