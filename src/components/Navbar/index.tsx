import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import AppBar from '@material-ui/core/AppBar'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Badge from '@material-ui/core/Badge'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import MenuIcon from '@material-ui/icons/Menu'
import MoreIcon from '@material-ui/icons/MoreVert'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'

import { logoutUser } from '../../redux/actions/auth'
import { useStyles } from '../../hooks/useStyles'
import { AppState } from '../../types'

export default function PrimarySearchAppBar() {
  const classes = useStyles()
  const history = useHistory()
  const auth = useSelector((state: AppState) => state.auth)
  const products = useSelector((state: AppState) => state.product.inCart)
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [
    mobileMoreAnchorEl,
    setMobileMoreAnchorEl,
  ] = React.useState<null | HTMLElement>(null)

  const isMenuOpen = Boolean(anchorEl)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const handleMenuClose = (text: string) => {
    history.push(text)
    setAnchorEl(null)
    handleMobileMenuClose()
  }

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  const handleLogoutClick = () => {
    dispatch(logoutUser())
    handleMenuClose('')
  }

  const handleDrawerOpen = () => {
    setOpen(true)
  }
  const handleDrawerClose = () => {
    setOpen(false)
  }

  const handleMenuItemClick = (text: string) => {
    setOpen(false)
    history.push(`${text}`)
  }

  const menuId = 'primary-search-account-menu'

  const renderMenu = auth.isAuthenticated ? (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => handleMenuClose('/dashboard')}>
        Dashboard
      </MenuItem>
      <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
    </Menu>
  ) : (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => handleMenuClose('/login')}>Login</MenuItem>
      <MenuItem onClick={() => handleMenuClose('/register')}>Register</MenuItem>
    </Menu>
  )

  // FIX mobile menu
  const mobileMenuId = 'primary-search-account-menu-mobile'
  const renderMobileMenu = auth.isAuthenticated ? (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={() => handleMenuClose('/dashboard')}>
        Dashboard
      </MenuItem>
      <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
    </Menu>
  ) : (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={() => handleMenuClose('/login')}>Login</MenuItem>
      <MenuItem onClick={() => handleMenuClose('/register')}>Register</MenuItem>
    </Menu>
  )

  return (
    <div className={classes.grow}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          <Link to="/" className={classes.link}>
            <Typography className={classes.title} variant="h6" noWrap>
              Library
            </Typography>
          </Link>

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="shopping cart button" color="inherit">
              <Badge badgeContent={products.length} color="secondary">
                <ShoppingCartIcon
                  onClick={() => {
                    history.push('/cart')
                  }}
                />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton aria-label="shopping cart button" color="inherit">
              <Badge badgeContent={products.length} color="secondary">
                <ShoppingCartIcon
                  onClick={() => {
                    history.push('/cart')
                  }}
                />
              </Badge>
            </IconButton>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <Typography variant="h6" noWrap>
            Menu
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button onClick={() => handleMenuItemClick('/')}>
            <Typography variant="body1" component="h2" gutterBottom>
              Home
            </Typography>
          </ListItem>
          <ListItem button onClick={() => handleMenuItemClick('/dashboard')}>
            <Typography variant="body1" component="h2" gutterBottom>
              Dashboard
            </Typography>
          </ListItem>
          <ListItem button onClick={() => handleMenuItemClick('/about')}>
            <Typography variant="body1" component="h2" gutterBottom>
              About Library
            </Typography>
          </ListItem>
        </List>
        <Divider />
      </Drawer>
      {renderMobileMenu}
      {renderMenu}
    </div>
  )
}
