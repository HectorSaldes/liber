import { Card } from 'primereact/card';
import React from 'react';
import Menu from '../components/Menu';
import { myCards } from '../assets/utils/Items';

export default function Home() {
  return (
    <div>
      <Menu />
      <div className="p-4">
        <div
          className="font-semibold text-center"
          style={{ fontSize: '8em', color: 'var(--blue-500)' }}
        >
          LIBER
        </div>
        <div className="text-justify md:text-center">
          <div
            className="p-text-italic p-text-center"
            style={{
              fontSize: '1.5em',
              color: 'var(--yellow-600)',
            }}
          >
            Liber del romano significa libre.
          </div>
          <div
            style={{
              fontSize: '2em',
            }}
          >
            Este un proyecto creado para ayudar a personas a descargar iconos y
            subir imágenes a internet completamente gratis.
          </div>
        </div>
      </div>
      <div className="grid text-center">
        {myCards.map((c) => (
          <div className="col-12 sm:col-6 md:col-4" key={c.id}>
            <Card
              className="mb-2"
              title={c.title}
              header={
                <img
                  style={{
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundClip: 'border-box',
                  }}
                  alt={c.title}
                  src={c.image}
                />
              }
              style={{
                fontSize: '20px',
              }}
            >
              <div className="text-justify" style={{ lineHeight: '1.5' }}>
                {c.text}
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
