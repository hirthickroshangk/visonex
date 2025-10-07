import React, { useEffect } from 'react';
import { Divider, List, ListItem, ListItemText, ListSubheader, ListItemIcon, Box, CircularProgress, ListItemButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles'; // fixed import
import { useDispatch, useSelector } from 'react-redux';

import useStyles from './styles';
import { useGetGenresQuery } from '../../services/TMDB';
import genreCategoryIcons from '../../assets/genres_and_categories'; // fixed path
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';

import lightLogo from '../../assets/images/lightLogo.png';
import darkLogo from '../../assets/images/darkLogo.png';

const categories = [
  { label: 'Popular', value: 'popular' },
  { label: 'Top Rated', value: 'top_rated' },
  { label: 'Upcoming', value: 'upcoming' },
];

function Sidebar({ setMobileOpen }) {
  const theme = useTheme();
  const classes = useStyles();
  const { data, isFetching } = useGetGenresQuery();

  const dispatch = useDispatch();
  const { genreIdOrCategoryName } = useSelector((state) => state.currentGenreOrCategory);

  useEffect(() => {
    setMobileOpen(false);
  }, [genreIdOrCategoryName, setMobileOpen]);

  // Store genres in localStorage
  useEffect(() => {
    if (data?.genres) {
      localStorage.setItem('genres', JSON.stringify(data.genres));
    }
  }, [data]);

  return (
    <>
      <Link to="/" className={classes.imageLink}>
        <img
          className={classes.image}
          src={theme.palette.mode === 'light' ? lightLogo : darkLogo}
          alt="Filmpire Site Logo"
        />
      </Link>
      <Divider />
      <List>
        <ListSubheader>Categories</ListSubheader>
        {categories.map(({ label, value }) => (
          <Link key={value} className={classes.links} to="/">
            <ListItem disablePadding>
              <ListItemButton onClick={() => dispatch(selectGenreOrCategory(value))}>
                <ListItemIcon>
                  <img src={genreCategoryIcons[label.toLowerCase()]} className={classes.genreImages} height={30} />
                </ListItemIcon>
                <ListItemText primary={label} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        <ListSubheader>Genres</ListSubheader>
        {isFetching ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : (
          data.genres.map(({ name, id }) => (
            <Link key={name} className={classes.links} to="/">
              <ListItem disablePadding>
                <ListItemButton onClick={() => dispatch(selectGenreOrCategory(id))}>
                  <ListItemIcon>
                    <img src={genreCategoryIcons[name.toLowerCase()]} className={classes.genreImages} height={30} />
                  </ListItemIcon>
                  <ListItemText primary={name} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))
        )}
      </List>
    </>
  );
}

export default Sidebar;
