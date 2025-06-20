import { Container, TableContainer } from "@mui/material";
import React, { useState } from "react";

import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';

import chroma from 'chroma-js';

import { ColourOption, colourOptions } from '../leads/filteroption.ts';
import Select, { StylesConfig } from 'react-select';


const Data = () => {

    const [open, setOpen] = useState(false);

    const [filter, setFilter] = useState('');

    const handleChange = (event) => {
        setFilter(event.target.value);
    };
    
    const dot = (color = 'transparent') => ({
        alignItems: 'center',
        display: 'flex',

        ':before': {
            backgroundColor: color,
            borderRadius: 10,
            content: '" "',
            display: 'block',
            marginRight: 8,
            height: 10,
            width: 10,
        },
    });

    const colourStyles = {
        control: (styles) => ({ ...styles, backgroundColor: 'white' }),
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            const color = chroma(data.color);
            return {
                ...styles,
                backgroundColor: isDisabled
                    ? undefined
                    : isSelected
                        ? data.color
                        : isFocused
                            ? color.alpha(0.1).css()
                            : undefined,
                color: isDisabled
                    ? '#ccc'
                    : isSelected
                        ? chroma.contrast(color, 'white') > 2
                            ? 'white'
                            : 'black'
                        : data.color,
                cursor: isDisabled ? 'not-allowed' : 'default',
    
                ':active': {
                    ...styles[':active'],
                    backgroundColor: !isDisabled
                        ? isSelected
                            ? data.color
                            : color.alpha(0.3).css()
                        : undefined,
                },
            };
        },
        input: (styles) => ({ ...styles, ...dot() }),
        placeholder: (styles) => ({ ...styles, ...dot('#ccc') }),
        singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
    };
    

    const companyObject = [
        {
            sr: 1,
            fullname: 'Synthesis technologies',
            email: 'WavePTE@simple.com ',
            contact: '123456789',
            password: 'Password',
            domain: 'XYZ@gmail.com',
            date: '20-03-2024',
            location: 'Mohali',
        },

        {
            sr: 2,
            fullname: 'WavePTE Chandigarh',
            email: 'WavePTE@simple.com ',
            contact: '123456789',
            password: 'Password',
            domain: 'XYZ@gmail.com',
            date: '20-03-2024',
            location: 'Panchkula',
        },

        {
            sr: 3,
            fullname: 'Sarvottam Real Estates',
            email: 'Sarvottamrealestates@simple.com ',
            contact: '123456789',
            password: 'Password',
            domain: 'XYZ@gmail.com',
            date: '20-03-2024',
            location: 'Chandigarh',
        },

        {
            sr: 4,
            fullname: 'WavePTE Chandigarh',
            email: 'WavePTE@simple.com ',
            contact: '123456789',
            password: 'Password',
            domain: 'XYZ@gmail.com',
            date: '20-03-2024',
            location: 'Karnal',
        },

        {
            sr: 5,
            fullname: 'WavePTE Chandigarh',
            email: 'WavePTE@simple.com ',
            contact: '123456789',
            password: 'Password',
            domain: 'XYZ@gmail.com',
            date: '20-03-2024',
            location: 'Delhi',
        },

        {
            sr: 6,
            fullname: 'WavePTE Chandigarh',
            email: 'WavePTE@simple.com ',
            contact: '123456789',
            password: 'Password',
            domain: 'XYZ@gmail.com',
            date: '20-03-2024',
            location: 'Zirakpur',
        },

        {
            sr: 7,
            fullname: 'WavePTE Chandigarh',
            email: 'WavePTE@simple.com ',
            contact: '123456789',
            password: 'Password',
            domain: 'XYZ@gmail.com',
            date: '20-03-2024',
            location: 'Noida',
        },

        {
            sr: 8,
            fullname: 'WavePTE Chandigarh',
            email: 'WavePTE@simple.com ',
            contact: '123456789',
            password: 'Password',
            domain: 'XYZ@gmail.com',
            date: '20-03-2024',
            location: 'Gurugram',
        },

        {
            sr: 9,
            fullname: 'WavePTE Chandigarh',
            email: 'WavePTE@simple.com ',
            contact: '123456789',
            password: 'Password',
            domain: 'XYZ@gmail.com',
            date: '20-03-2024',
            location: 'Patiala',
        },

        {
            sr: 10,
            fullname: 'WavePTE Chandigarh',
            email: 'WavePTE@simple.com ',
            contact: '123456789',
            password: 'Password',
            domain: 'XYZ@gmail.com',
            date: '20-03-2024',
            location: 'Kharar',
        },

        {
            sr: 11,
            fullname: 'WavePTE Chandigarh',
            email: 'WavePTE@simple.com ',
            contact: '123456789',
            password: 'Password',
            domain: 'XYZ@gmail.com',
            date: '20-03-2024',
            location: 'Manali',
        },

        {
            sr: 12,
            fullname: 'WavePTE Chandigarh',
            email: 'WavePTE@simple.com ',
            contact: '123456789',
            password: 'Password',
            domain: 'XYZ@gmail.com',
            date: '20-03-2024',
            location: 'Delhi',
        },

        {
            sr: 13,
            fullname: 'WavePTE Chandigarh',
            email: 'WavePTE@simple.com ',
            contact: '123456789',
            password: 'Password',
            domain: 'XYZ@gmail.com',
            date: '20-03-2024',
            location: 'Shimla',
        },

        {
            sr: 14,
            fullname: 'WavePTE Chandigarh',
            email: 'WavePTE@simple.com ',
            contact: '123456789',
            password: 'Password',
            domain: 'XYZ@gmail.com',
            date: '20-03-2024',
            location: 'Delhi',
        },

        {
            sr: 15,
            fullname: 'WavePTE Chandigarh',
            email: 'WavePTE@simple.com ',
            contact: '123456789',
            password: 'Password',
            domain: 'XYZ@gmail.com',
            date: '20-03-2024',
            location: 'Lucknow',
        },

    ]

    return (
        <>

            <table className="table table-white text-dark">
                <tbody>
                    {companyObject.map((i, j) => {
                        return (
                            <Card sx={{ p: 0, display: 'flex', flexDirection: 'row', margin: '12px' , overflow:'visible',background: "transparent",
                                border: "solid 1px #b8b8b8",
                                boxShadow: "none", }}>
                                <Grid container alignItems="center" spacing={0}>
                                    <Grid item xs={12} sm={6} md={4} display="flex" justifyContent="">
                                        <Grid item sx={{ marginRight: '8px' }}>
                                            <th className="px-3 py-2 rounded-3 text-dark nostudent">{i.sr}</th>
                                        </Grid>

                                        <Grid item>
                                            <div className="d-flex">
                                                <div className="p-1 rounded-3 me-2 logoimage">"""</div>
                                                <Typography variant="h6" sx={{ fontSize: '16px' }}>{i.fullname}</Typography>
                                            </div>
                                            {/* <Typography sx={{ fontSize: '14px' }}>{i.email}</Typography> */}
                                            <Typography sx={{ fontSize: '13px' }}>{i.date}</Typography>
                                        </Grid>
                                    </Grid>


                                    <Grid item xs={12} sm={6} md={3} >
                                        <Typography sx={{ fontSize: '14px' }}>{i.email}</Typography>
                                        <Typography sx={{ fontSize: '13px' }}>{i.password}</Typography>
                                    </Grid>

                                    <Grid item xs={12} sm={6} md={3} >
                                        <Typography sx={{ fontSize: '14px' }}>{i.contact}</Typography>
                                        <Typography sx={{ fontSize: '13px' }}>{i.domain}</Typography>
                                    </Grid>

                                    <Grid item xs={12} sm={6} md={2} display="flex" justifyContent="flex-end" sx={{ paddingRight: "20px" }}>
                                    <Select
                                            defaultValue={colourOptions[2]}
                                            options={colourOptions}
                                            styles={colourStyles}
                                        />
                                    </Grid>
                                </Grid>
                            </Card>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
}

export default Data