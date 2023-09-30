import { Typography } from '@mui/material'
import './About.css'

export default function About() {
    return (
        <div className='About'>
            <Typography component="h1" sx={{ fontWeight: 600, fontSize: 16 }}>
                Hey! <br /> We're Sugar&Spice
                <Typography component="p" sx={{ fontWeight: 400, fontSize: 16 }}>
                    "Sugar&Spice," is your one-stop destination for all things sweet and indulgent! Our website is a haven for dessert enthusiasts, home bakers, and anyone with a sweet tooth. Whether you're a novice looking to learn the basics or a seasoned pro in search of new inspiration, we've got you covered.
                </Typography>
            </Typography>
        </div>
    )
}