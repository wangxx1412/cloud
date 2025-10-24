// FilterableTable.tsx
import React, { useMemo, useState } from 'react';
import {
  Popover,
  Checkbox,
  Stack,
  Group,
  Button,
  Text,
  Divider,
} from '@mantine/core';
import MantineReactTable, {
  type MRT_ColumnDef,
  type MRT_FilterOption,
} from 'mantine-react-table';

// sample data type
type Person = {
  id: string;
  role: 'Admin' | 'Location Manager' | 'Workforce';
  location: string;
  status: 'Active' | 'Blocked' | 'Pending';
  workEmail: string;
};

// small helper to gather unique values for a column
const uniqueValues = (rows: Person[], key: keyof Person) =>
  Array.from(new Set(rows.map((r) => String(r[key])))).sort();

type FilterPopoverProps = {
  column: {
    getFilterValue: () => string[] | undefined;
    setFilterValue: (v: string[] | undefined) => void;
    getIsFiltering: () => boolean;
    columnDef: { id?: string; header?: string };
  };
  options: string[]; // list of choices to show as checkboxes
  placeholder?: string;
};

/**
 * Reusable FilterPopover component:
 * - shows checkboxes for multiple selection
 * - Clear button clears the temporary selection
 * - Apply button commits it into column.setFilterValue([...])
 */
function FilterPopover({ column, options, placeholder }: FilterPopoverProps) {
  const initial = (column.getFilterValue() as string[] | undefined) ?? [];
  const [opened, setOpened] = useState(false);
  const [selected, setSelected] = useState<string[]>(initial);

  // when column filter value changes externally, keep local state in sync
  React.useEffect(() => {
    setSelected((column.getFilterValue() as string[] | undefined) ?? []);
  }, [column.getFilterValue]);

  const toggle = (val: string) =>
    setSelected((prev) => (prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]));

  const handleApply = () => {
    // commit filter to column (MRT treats column.setFilterValue as the API to set a filter)
    column.setFilterValue(selected.length ? selected : undefined);
    setOpened(false);
  };

  const handleClear = () => {
    setSelected([]);
    column.setFilterValue(undefined);
    setOpened(false);
  };

  // small indicator text used in header cell (optional)
  const isFiltering = column.getIsFiltering();

  return (
    <Popover
      opened={opened}
      onClose={() => setOpened(false)}
      position="bottom-start"
      withArrow
      width={300} // control width to match your screenshot sizing
      shadow="sm"
      withinPortal={false} // keep it attached to the header area
      transitionProps={{ transition: 'pop' }}
      styles={{
        dropdown: {
          // ensure it sits above the row items
          zIndex: 2100,
          borderRadius: 8,
          padding: 8,
        },
      }}
    >
      {/* Target: small header label; you can replace this with an icon button */}
      <Popover.Target>
        <div
          role="button"
          onClick={() => setOpened((o) => !o)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            cursor: 'pointer',
            padding: '6px 8px',
            userSelect: 'none',
          }}
        >
          <Text size="sm" weight={500}>
            {placeholder ?? column.columnDef.header}
          </Text>
          {/* small indicator when active */}
          {isFiltering ? <Text size="xs" color="blue">•</Text> : null}
        </div>
      </Popover.Target>

      <Popover.Dropdown>
        <Stack spacing="xs">
          {options.map((opt) => (
            <Checkbox
              key={opt}
              label={opt}
              checked={selected.includes(opt)}
              onChange={() => toggle(opt)}
            />
          ))}

          <Divider />

          <Group position="apart" spacing="xs">
            <Button variant="subtle" onClick={handleClear} size="xs">
              Clear
            </Button>
            <Button onClick={handleApply} size="xs">
              Apply
            </Button>
          </Group>
        </Stack>
      </Popover.Dropdown>
    </Popover>
  );
}

// Example table component using the FilterPopover
export default function FilterableTable() {
  const data = useMemo<Person[]>(
    () => [
      {
        id: '1',
        role: 'Admin',
        location: 'Vancouver',
        status: 'Active',
        workEmail: 'a@a.com',
      },
      {
        id: '2',
        role: 'Location Manager',
        location: 'North West Locationname',
        status: 'Active',
        workEmail: 'b@a.com',
      },
      {
        id: '3',
        role: 'Workforce',
        location: 'Toronto',
        status: 'Blocked',
        workEmail: 'c@a.com',
      },
      // ... more rows
    ],
    [],
  );

  // collect unique options for role/location/status filters
  const roleOptions = useMemo(() => uniqueValues(data, 'role'), [data]);
  const locationOptions = useMemo(() => uniqueValues(data, 'location'), [data]);
  const statusOptions = useMemo(() => uniqueValues(data, 'status'), [data]);

  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: 'workEmail',
        header: 'Work Email',
        enableColumnFilter: false, // example: no popover filter for email
      },
      {
        accessorKey: 'role',
        header: 'Role',
        // provide a custom Filter renderer
        Filter: ({ column }) => (
          <FilterPopover column={column} options={roleOptions} placeholder="Filter by Role" />
        ),
        // optional: make sorting friendly
        enableSorting: true,
      },
      {
        accessorKey: 'location',
        header: 'Location',
        Filter: ({ column }) => (
          <FilterPopover column={column} options={locationOptions} placeholder="Location" />
        ),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        Filter: ({ column }) => (
          <FilterPopover column={column} options={statusOptions} placeholder="Status" />
        ),
      },
    ],
    [roleOptions, locationOptions, statusOptions],
  );

  return (
    <div style={{ padding: 12 }}>
      <MantineReactTable
        columns={columns}
        data={data}
        enableColumnActions={false}
        enableColumnResizing={false}
        enablePagination={false}
        enableGlobalFilter={false}
        // show column filters in header area -- this keeps the header compact in MRT
        renderTopToolbarCustomActions={() => null}
        mantineTableProps={{
          // small styling to look like your screenshot
          withBorder: true,
          striped: false,
        }}
      />
    </div>
  );
}
