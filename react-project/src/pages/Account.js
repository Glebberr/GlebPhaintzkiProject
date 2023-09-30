import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useContext, useEffect, useState } from 'react';
import { GeneralContext, token } from '../App';
import { noPassSchema } from '../utility/Joi';
import { structure } from './Account-config';

export default function Account() {
    const { snackbar, setLoader, navigate, setUser } = useContext(GeneralContext);
    const [formData, setFormData] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        phone: '',
        email: '',
        imgUrl: '',
        imgAlt: '',
        state: '',
        country: '',
        city: '',
        street: '',
        houseNumber: '',
        zip: '',
    });

    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);

    // Get client information
    useEffect(() => {
        setLoader(true);
        fetch(`https://api.shipap.co.il/clients/login`, {
            credentials: 'include',
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    res.text()
                        .then(x => {
                            throw new Error(x)
                        })
                }
            })
            .then(data => {
                setFormData(data);
            })
            .catch(err => {
                console.log(err);
                navigate('/');
            })
            .finally(() => setLoader(false));
    }, [navigate, setLoader]);

    function editInfo(ev) {
        fetch(`https://api.shipap.co.il/clients/update?token=${token}`, {
            credentials: 'include',
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(formData),
        })
            .then(() => {
                snackbar('User updated successfully');
                navigate('/');
                setUser(formData);
            })
            .catch(err => {
                console.log(err)
                snackbar("Failed to update information")
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
        const schema = noPassSchema.validate(obj, { abortEarly: false, allowUnknown: true });
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
                    marginTop: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'black' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Account Information
                </Typography>
                <Box component="form" sx={{ mt: 3 }}>
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
                    </Grid>
                    <Button
                        onClick={editInfo}
                        disabled={!isValid}
                        fullWidth
                        variant="contained"
                        sx={{ mt: 2, mb: 10 }}
                    >
                        Save Info
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}