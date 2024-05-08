import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { Stack } from '@mui/material';


const sxOptions = {
  maxWidth: '500px',
  margin: 'auto',
  top:'200px',
  position:'relative',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  backgroundColor: 'white',
};

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
;

  const onSubmit = (values) => {
    localStorage.setItem('isAuth', String(true));
    localStorage.setItem('user', JSON.stringify(values));
    navigate('/');
  };

  const userNameControl = register('username', {
    required: 'Введите имя пользователя',
    minLength: {
      value: 6,
      message: 'Не менее шести символов',
    },
  });

  const userPasswordControl = register('password', {
    required: 'Введите пароль',
    minLength: {
      value: 3,
      message: 'Не менее шести символов',
    },
  });


  return <>
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={sxOptions}
    >
      <Typography variant="h5" component="div" sx={{ mb: 2 }}>Создать аккаунт</Typography>

      <TextField
        fullWidth
        label="Имя пользователя"
        {...userNameControl}
        error={Boolean(errors.username)}
        helperText={errors.username?.message}
        margin="normal"
      />

      <TextField
        fullWidth
        type="password"
        label="Пароль"
        {...userPasswordControl}
        error={Boolean(errors.password)}
        helperText={errors.password?.message}
        margin="normal"
        sx={{ mt: 2 }}
      />

      <Stack direction="row" justifyContent="space-between" alignItems="center" paddingTop={2}>
        <Button type="submit" variant="contained" color="primary">создать аккаунт</Button>
        <Button variant="outlined" onClick={() => navigate('/sign-in')}>Уже есть аккаунт</Button>
      </Stack>
    </Box>
  </>
};

export default LoginForm;