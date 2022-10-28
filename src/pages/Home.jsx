import {Card} from 'primereact/card';
import React from 'react';
import {myCards} from '../assets/utils/Items';
import "../assets/css/cardStyle.css";

export default function Home() {

  const CardHome = ({c}) => (
    <div
      className='col-12 sm:col-6 md:col-3'
      data-aos="fade-up"
      key={c.id}>
      <Card className='mb-2 homeCards' title={c.title} style={{fontFamily: 'poppins'}} header={
          <img style={{objectFit: 'cover',}} width='100%' height='200px' alt={c.title} src={c.image}/>}>
        <div className='text-justify' style={{lineHeight: '1.5', fontSize: '20px', height: "200px"}}>{c.text}</div>
      </Card>
    </div>
  )

  return (
    <div className='p-4'>
      <div className='font-semibold text-center title'
           style={{fontSize: '8em'}}>
        LIBER
      </div>
      <div className='text-justify md:text-center'>
        <div
          className='p-text-italic p-text-center'
          style={{fontSize: '1.5em', color: 'var(--yellow-500)',}}>
          LIBER from Roman means free
        </div>
        <div
          style={{fontSize: '1.5em', marginBottom: '150px'}}
          className='my-5'>
          This is a proyect created to help others to download and upload
          resources completely free from <a style={{color:'green', fontWeight:'bold'}} href="https://icons8.com/" target='_blank' rel='noreferrer'>Icons8</a>
        </div>
      </div>
      <div className='grid text-center'>{myCards.map((c) => (<CardHome c={c}/>))}</div>
    </div>
  );
}
