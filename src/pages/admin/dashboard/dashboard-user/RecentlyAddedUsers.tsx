import { Avatar, Box, Divider, List, ListItem, ListItemAvatar, ListItemText, Paper, Typography } from '@mui/material';

const users = [
  {
    _id: '1',
    name: 'John Doe',
    photoURL: 'https://picsum.photos/200/300',
    timeCreated: '2021-10-10 10:10:10',
  },
  {
    _id: '2',
    name: 'Jane Doe',
    photoURL: 'https://picsum.photos/200/300',
    timeCreated: '2021-10-10 10:10:10',
  },
  {
    _id: '3',
    name: 'John Doe',
    photoURL: 'https://picsum.photos/200/300',
    timeCreated: '2021-10-10 10:10:10',
  },
  {
    _id: '4',
    name: 'Jane Doe',
    // random user image
    photoURL: 'https://picsum.photos/200/300',
    timeCreated: '2021-10-10 10:10:10',
  },
  {
    _id: '5',
    name: 'John Doe',
    photoURL: 'https://picsum.photos/200/300',
    timeCreated: '2021-10-10 10:10:10',
  },
  {
    _id: '6',
    name: 'Jane Doe',
    photoURL: 'https://picsum.photos/200/300',
    timeCreated: '2021-10-10 10:10:10',
  },
  {
    _id: '7',
    name: 'John Doe',
    photoURL: 'https://picsum.photos/200/300',
    timeCreated: '2021-10-10 10:10:10',
  },
  {
    _id: '8',
    name: 'Jane Doe',
    photoURL: 'https://picsum.photos/200/300',
    timeCreated: '2021-10-10 10:10:10',
  },
  {
    _id: '9',
    name: 'John Doe',
    photoURL: 'https://picsum.photos/200/300',
    timeCreated: '2021-10-10 10:10:10',
  },
  {
    _id: '10',
    name: 'Jane Doe',
    photoURL: 'https://picsum.photos/200/300',
    timeCreated: '2021-10-10 10:10:10',
  },
];

const RecentlyAddedUsers = () => {
  return (
    <Paper elevation={3}>
      <Box>
        <Typography
          sx={{
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center',
            padding: '10px 0',
          }}>
          Recently added Users
        </Typography>
        <List>
          {users.slice(0, 10).map((user, i) => (
            <Box key={user._id}>
              <ListItem className='cursor-pointer transition-all duration-300 ease-in-out hover:bg-gray-300 active:bg-gray-400'>
                <ListItemAvatar>
                  <Avatar alt={user?.name} src={user?.photoURL} />
                </ListItemAvatar>
                <ListItemText
                  primary={user?.name}
                  secondary={`Time Created: ${
                    user?.timeCreated ? new Date(user?.timeCreated).toLocaleString() : user?.timeCreated
                  }`}
                  secondaryTypographyProps={{
                    className: ' overflow-hidden whitespace-nowrap overflow-ellipsis',
                  }}
                />
              </ListItem>
              {i !== 9 && <Divider variant='inset' />}
            </Box>
          ))}
        </List>
      </Box>
    </Paper>
  );
};

export default RecentlyAddedUsers;
