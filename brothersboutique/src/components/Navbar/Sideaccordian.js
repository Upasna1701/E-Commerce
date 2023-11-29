import * as React from 'react';
import {Accordion,AccordionSummary,AccordionDetails,Typography} from '@material-ui/core';
import { FaAngleDown} from "react-icons/fa";

export default function Sideaccordian() {
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<FaAngleDown/>}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Category</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <ul className='acc-list'>
                <li>T-Shirts</li>
                <li>T-Shirts</li>
                <li>T-Shirts</li>
                <li>T-Shirts</li>
            </ul>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<FaAngleDown />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Sizes</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <ul className='acc-list'>
                <li>XS</li>
                <li>S</li>
                <li>M</li>
                <li>L</li>
                <li>XL</li>
                <li>XXL</li>
            </ul>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<FaAngleDown />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Rating</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <ul className='acc-list'>
                <li>T-Shirts</li>
                <li>T-Shirts</li>
                <li>T-Shirts</li>
                <li>T-Shirts</li>
            </ul>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<FaAngleDown />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Discount</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <ul className='acc-list'>
                <li>T-Shirts</li>
                <li>T-Shirts</li>
                <li>T-Shirts</li>
                <li>T-Shirts</li>
            </ul>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<FaAngleDown />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Sort By</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <ul className='acc-list'>
                <li>Price High-to-low</li>
                <li>Price low-to-High</li>
            </ul>
          </Typography>
        </AccordionDetails>
      </Accordion>
      
    </div>
  );
}