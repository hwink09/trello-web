import Box from '@mui/material/Box'
import ModeSelect from '~/components/ModeSelect/ModeSelect'
import AppsIcon from '@mui/icons-material/Apps'
import { ReactComponent as trelloLogo } from '~/assets/trello.svg'
import SvgIcon from '@mui/material/SvgIcon'
import Typography from '@mui/material/Typography'
import WorkSpaces from './Menus/WorkSpaces'
import Recent from './Menus/Recent'
import Template from './Menus/Template'
import Starred from './Menus/Starred'
import Profiles from './Menus/Profiles'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import { Link } from 'react-router-dom'
import Notifications from './Notifications/Notifications'
import AutoCompleteSearchBoard from './SearchBoards/AutoCompleteSearchBoard'

function AppBar() {
  return (
    <Box
      sx={{
        width: '100%',
        height: (theme) => theme.trello.appBarHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        paddingX: 2,
        overflowX: 'auto',
        bgcolor: (theme) =>
          theme.palette.mode === 'dark' ? '#3c2e50' : '#1565c0'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }} gap={1}>
        <Link to="/boards">
          <Tooltip title="Boards List">
            <AppsIcon sx={{ color: 'white', verticalAlign: 'middle' }} />
          </Tooltip>
        </Link>

        <Link to="/">
          <Box sx={{ display: 'flex', alignItems: 'center' }} gap={0.5}>
            <SvgIcon
              component={trelloLogo}
              fontSize="small"
              inheritViewBox
              sx={{ color: 'white' }}
            />
            <Typography
              variant="span"
              sx={{
                fontSize: '1.2rem',
                fontWeight: 'Bold',
                color: 'white'
              }}
            >
              Trello
            </Typography>

            <Box sx={{ display: { xs: 'none', md: 'flex' } }} gap={1}>
              <WorkSpaces />
              <Recent />
              <Starred />
              <Template />
              <Button
                sx={{
                  color: 'white',
                  border: 'none',
                  '&:hover': { border: 'none' }
                }}
                variant="outlined"
                startIcon={<LibraryAddIcon />}
              >
                Create
              </Button>
            </Box>
          </Box>
        </Link>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center' }} gap={2}>
        {/* Tìm kiếm nhanh một hoặc nhiều cái board  */}
        <AutoCompleteSearchBoard />

        {/* Dark/Light/System Mode Switch */}
        <ModeSelect />

        {/* Xử lí hiện thị các thông báo - Notifications */}
        <Notifications />

        <Tooltip title="Help" sx={{ cursor: 'pointer' }}>
          <HelpOutlineIcon sx={{ cursor: 'pointer', color: 'white' }} />
        </Tooltip>

        <Profiles />
      </Box>
    </Box>
  )
}

export default AppBar
