import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuList from '@mui/material/MenuList';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

interface TechProps {
  id: number;
  orderNumber: string;
  issueDate: string;
  issueType:string;
  companyName:string;
  capelNum:number;
  capenaNum:number;
  baxNumber:number;
  endDate:string;
  createdAt: string;
  central:{
    id: number;
    name: string;
    area: {
      id: number;
      name: string;
      sector: {
        id: number;
        name: string;
      };
  };
};
}

type UserTableRowProps = {
  row: TechProps;
  selected: boolean;
  onSelectRow: () => void;
};

export function SectorTableRow({ row, selected, onSelectRow }: UserTableRowProps) {
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);

  const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={onSelectRow} />
        </TableCell>
        <TableCell>{row.orderNumber}</TableCell>
        <TableCell>{row.companyName}</TableCell>
        <TableCell>{new Date(row.issueDate).toLocaleDateString()}</TableCell>
        <TableCell>{row.issueType}</TableCell>
        <TableCell>{row.capelNum}</TableCell>
        <TableCell>{row.capenaNum}</TableCell>
        <TableCell>{row.baxNumber}</TableCell>
        <TableCell>{new Date(row.endDate).toLocaleDateString()}</TableCell>
        <TableCell>{row.central?.area?.sector?.name}</TableCell>
        <TableCell>{row.central?.area?.name}</TableCell>
        <TableCell>{row.central?.name}</TableCell>
        <TableCell>{new Date(row.createdAt).toLocaleDateString()}</TableCell>
       
        <TableCell align="right">
          <IconButton onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!openPopover}
        anchorEl={openPopover}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuList
          disablePadding
          sx={{
            p: 0.5,
            gap: 0.5,
            width: 140,
            display: 'flex',
            flexDirection: 'column',
            [`& .${menuItemClasses.root}`]: {
              px: 1,
              gap: 2,
              borderRadius: 0.75,
              [`&.${menuItemClasses.selected}`]: { bgcolor: 'action.selected' },
            },
          }}
        >
          <MenuItem onClick={handleClosePopover}>
            <Iconify icon="solar:pen-bold" />
            Edit
          </MenuItem>

          <MenuItem onClick={handleClosePopover} sx={{ color: 'error.main' }}>
            <Iconify icon="solar:trash-bin-trash-bold" />
            Delete
          </MenuItem>
        </MenuList>
      </Popover>
    </>
  );
}
