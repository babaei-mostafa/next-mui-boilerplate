'use client'

import { Dispatch, SetStateAction } from 'react'

import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'

import HomeIcon from '@mui/icons-material/Home'
import CloseIcon from '@mui/icons-material/Close'

import BG from '@/public/assets/images/menu-image-default.jpg'
import { useMediaQuery } from '@mui/material'

const menuItems = [
  { id: 'home', title: 'Home', Icon: HomeIcon },
  { id: 'skin-care', title: 'Skin Care', Icon: HomeIcon },
  { id: 'treatments', title: 'Treatments', Icon: HomeIcon },
  { id: 'promotions', title: 'Promotions', Icon: HomeIcon },
  { id: 'gallery', title: 'Gallery', Icon: HomeIcon },
  { id: 'reviews', title: 'Reviews', Icon: HomeIcon },
  { id: 'about-us', title: 'About Us', Icon: HomeIcon },
]

interface Props {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

// ====================|| DRAWER ||==================== //

export default function MainDrawer({ open, setOpen }: Props) {
  const moreMd = useMediaQuery((theme) => theme.breakpoints.up('md'))
  const toggleDrawer = (newOpen: boolean) => {
    setOpen(newOpen)
  }

  const DrawerList = (
    <Box sx={{ width: 250 }} role="menu" onClick={() => toggleDrawer(false)}>
      <List>
        {menuItems.map((item) => {
          const { id, title, Icon } = item
          return (
            <ListItem key={`mein-menu-item-${id}`}>
              <ListItemButton>
                <ListItemIcon>{<Icon />}</ListItemIcon>
                <ListItemText primary={title} />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
    </Box>
  )

  return (
    <>
      <Drawer open={open} onClose={() => toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </>
  )
}
