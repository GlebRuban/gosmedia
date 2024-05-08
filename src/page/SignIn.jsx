import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
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
    setError,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  watch(() => {
    if (errors.invalidUser) {
      clearErrors('invalidUser');
    }
  });

  const onSubmit = (values) => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.username === values.username && user.password === values.password) {
      localStorage.setItem('isAuth', String(true));
      navigate('/');
    } else {
      setError('invalidUser', { message: 'Не верный пароль или имя пользователя' });
    }
  };

  const userNameControl = register('username', {
    required: 'Введите имя пользователя',
    minLength: {
      value: 3,
      message: 'Не менее трёх символов',
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
      <Typography variant="h5" component="div" sx={{ mb: 2 }}>Вход</Typography>

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

      {
        errors.invalidUser?.message
        ? <Typography color={'red'} component="div" style={{ margin: '0px' }} sx={{ mb: 2 }}>{ errors.invalidUser.message }</Typography>
        : null
      }

      <Stack direction="row" justifyContent="flex-start" alignItems="center">
        <Checkbox onChange={() => {}} color="primary" />
        <Typography component="div" style={{ margin: '0px' }} sx={{ mb: 2 }}>Запомнить меня</Typography>
      </Stack>

      <Stack direction="row" justifyContent="space-between" alignItems="center" paddingTop={2}>
        <Button type="submit" variant="contained" color="primary">Вход</Button>
        <Button variant="outlined" onClick={() => navigate('/sign-up')}>создать аккаунт</Button>
      </Stack>
    </Box>
  </>
};

export default LoginForm;