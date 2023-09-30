import { useContext, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import { structure } from './Signup-config';
import { userSchema } from '../utility/Joi';
import { GeneralContext, token } from '../App';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function Signup() {
    const { snackbar, setLoader, navigate } = useContext(GeneralContext);
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        phone: '',
        email: '',
        password: '',
        imgUrl: '',
        imgAlt: '',
        state: '',
        country: '',
        city: '',
        street: '',
        houseNumber: '',
        zip: '',
        business: false,
    });

    function signup(ev) {
        ev.preventDefault();

        setLoader(true);
        fetch(`https://api.shipap.co.il/clients/signup?token=${token}`, {
            credentials: 'include',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                        .then(() => {
                            sessionStorage.email = formData.email;
                            snackbar("User was created successfully")
                            navigate('/login');
                        })
                } else {
                    return res.text()
                        .then(x => {
                            throw new Error(x);
                        });
                }
            })
            .catch(err => {
                snackbar(err.message);
                console.log(err);
            })
            .finally(() => {
                setLoader(false);
            })
    }

    const handleInput = ev => {
        const { id, value } = ev.target;
        let obj = {
            ...formData,
            [id]: value,
        };

        if (id === 'business') {
            const { id, checked } = ev.target;
            obj = {
                ...formData,
                [id]: checked
            }
        }
        console.log(obj);
        const schema = userSchema.validate(obj, { abortEarly: false, allowUnknown: true });
        console.log(schema);
        const err = { ...errors, [id]: undefined };
        if (schema.error) {
            const error = schema.error.details.find(e => e.context.key === id);
            if (error) {
                err[id] = error.message;
            }
            setIsValid(false);
        } else {
            setIsValid(true);
        }
        setFormData(obj);
        setErrors(err);
    };

    return (
        <Container component="main" maxWidth="md">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 2.5,
                    mb: 9,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Grid sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <Avatar sx={{ m: 1, bgcolor: 'black' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                </Grid>
                <Box component="form" sx={{ mt: 2.5 }}>
                    <Grid container spacing={1.9}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                error={Boolean(errors.firstName)}
                                helperText={errors.firstName}
                                value={formData.firstName}
                                onChange={handleInput}
                                name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus

                            />
                        </Grid>
                        {
                            structure.map(item =>
                                <Grid item xs={12} sm={item.halfWidth ? 6 : 12} key={item.name}>
                                    <TextField
                                        error={Boolean(errors[item.name])}
                                        helperText={errors[item.name]}
                                        onChange={handleInput}
                                        value={formData[item.name]}
                                        name={item.name}
                                        type={item.type}
                                        required={item.required}
                                        fullWidth
                                        id={item.name}
                                        label={item.label}
                                    />
                                </Grid>
                            )
                        }
                        <Grid item xs={12} sx={{ mt: -1 }}>
                            <FormControlLabel
                                label="Business"
                                control={<Checkbox
                                    id="business"
                                    color="primary"
                                    checked={formData.business}
                                    onChange={handleInput}
                                    name="business"
                                />}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        onClick={signup}
                        disabled={!isValid}
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 1, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="center">
                        <Grid item>
                            <Link to="/login">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}