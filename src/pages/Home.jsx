import { Card } from 'primereact/card';
import React from 'react';
import { myCards } from '../assets/utils/Items';

export default function Home() {
  return (
    <div className="p-4">
      <div
        className="font-semibold text-center"
        style={{ fontSize: '8em', color: '#87BCE7' }}
      >
        LIBER
      </div>
      <div className="text-justify md:text-center">
        <div
          className="p-text-italic p-text-center"
          style={{ fontSize: '1.5em', color: 'var(--yellow-600)' }}
        >
          Liber del romano significa libre.
        </div>
        <div
          style={{  fontSize: '1.5em', }}
          className="my-5"
        >
          Este un proyecto creado para ayudar a personas a descargar iconos y
          subir imágenes a internet completamente gratis.
        </div>
      </div>
      <div className="grid text-center">
        {myCards.map((c) => (
          <div className="col-12 sm:col-6 md:col-4" key={c.id}>
            <Card
              className="mb-2"
              title={c.title}
              style={{fontFamily:'poppins'}}
              header={
                <img
                  style={{
                    objectFit: "cover"
                  }}
                  alt={c.title}
                  src={c.image}
                />
              }
            >
              <div
                className="text-justify"
                style={{ lineHeight: '1.5', fontSize: '20px' }}
              >
                {c.text}
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
