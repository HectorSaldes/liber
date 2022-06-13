import { AutoComplete } from 'primereact/autocomplete';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Dropdown } from 'primereact/dropdown';
import { SpeedDial } from 'primereact/speeddial';
import React, { useState, useRef } from 'react';
import Menu from '../components/Menu';
import Empty from '../assets/svg/emptyIcons.svg';
import IconsService from '../service/IconsService';
import IconSkeleton from '../components/IconSkeleton';
import IconCard from '../components/IconCard';
import { categories } from '../assets/utils/Items';

export default function Icons() {
  const toast = useRef(null);
  const [listSearch, setListSearch] = useState([]);
  const [valueSelected, setValueSelected] = useState(null);
  const [categorySelected, setCategorySelected] = useState('all');
  const [offsetSelected, setOffsetSelected] = useState(0);
  const [listOfIcons, setListOfIcons] = useState([]);
  const [loading, setLoading] = useState(false);

  const messages = (severity, summary, detail) => {
    toast.current.show({
      severity,
      summary,
      detail,
      life: 3000,
    });
  };

  const querySearch = async (text) => {
    return IconsService.autoComplete(text)
      .then(({ data: { data } }) => data)
      .catch((err) => null);
  };

  const getAllIcons = async () => {
    const allIcons = await IconsService.searchIcons(
      valueSelected,
      categorySelected,
      offsetSelected
    );
    setListOfIcons(allIcons);
  };

  const searchWithText = async ({ query }) => {
    const data = await querySearch(query);
    const replace = await data.map((d) => d.replaceAll('-', ' '));
    setListSearch(replace);
  };

  const searchIcons = (e) => {
    try {
      if (e === 'Enter') {
        if (valueSelected) {
          getAllIcons();
        } else {
          messages(
            'error',
            'Debes colocar alguna palabra',
            'Para empezar a buscar'
          );
        }
      }
    } catch (error) {
      messages(
        'error',
        'Ocurrió un error al esperar al servidor',
        'Vuelve a intentarlo un poco más tarde'
      );
    }
  };

  const getPartialcons = async () => {
    const allIcons = await IconsService.searchIcons(
      valueSelected,
      categorySelected,
      offsetSelected + 50
    );
    console.log(offsetSelected);
    setListOfIcons([...listOfIcons, ...allIcons]);
  };

  const onLoadingClick = () => {
    setLoading(true);
    setOffsetSelected(offsetSelected + 50);
    getPartialcons();
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  const convertSvgToFileAndDownload = (svg, name) => {
    const decode = atob(svg);
    const blob = new Blob([decode]);
    const fileUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = fileUrl;
    link.setAttribute('download', `${name}.svg`);
    document.body.appendChild(link);
    link.click();
    URL.revokeObjectURL(fileUrl);
    link.parentNode.removeChild(link);
  };

  const getIconToDownload = async (id, commonName) => {
    try {
      await IconsService.getIcon(id).then(({ data }) => {
        convertSvgToFileAndDownload(data.icon.svg, commonName);
      });
    } catch (error) {
      messages(
        'error',
        'Ocurrió un error al esperar al servidor',
        'Vuelve a intentarlo un poco más tarde'
      );
    }
  };

  const cleanFilters = () => {
    setListSearch([]);
    setValueSelected(null);
    setCategorySelected('all');
    setOffsetSelected(0);
    setListOfIcons([]);
  };

  return (
    <div>
      <Menu />
      <Toast ref={toast}></Toast>
      <div className="text-center mt-2">
        <div className="font-bold" style={{ fontSize: '40px' }}>
          Iconos
        </div>
        <div
          className="mb-2 text-justify sm:text-center"
          style={{ fontSize: '25px' }}
        >
          Aquí puedes decargar los iconos que sean necesarios, comienza usando el campo de texto
        </div>
      </div>

      <div className="grid p-2">
        <div className="col-12 col-offset-0 md:col-6 md:col-offset-3">
          <div className="grid">
          <AutoComplete
            className="col-12 md:col-6"
            placeholder="Busca iconos..."
            value={valueSelected}
            suggestions={listSearch}
            completeMethod={searchWithText}
            onChange={(e) => setValueSelected(e.value)}
            onKeyPress={({ key }) => searchIcons(key)}
            inputStyle={{ width: '100%' }}
          />
          <div className="col-12 md:col-6">
            <Dropdown
              style={{ width: '100%' }}
              options={categories}
              value={categorySelected}
              emptyMessage="No hay opciones"
              placeholder="Selecciona una categoría"
              onChange={(e) => setCategorySelected(e.value)}
            />
          </div>
          <div className="col-12 md:col-6">
            <Button
              label="Buscar"
              icon="pi pi-search"
              className="p-button-info"
              onClick={() => searchIcons('Enter')}
              style={{ width: '100%' }}
            />
          </div>
          <div className="col-12 md:col-6">
            <Button
              label="Borrar filtros"
              className="p-button-danger"
              onClick={() => cleanFilters()}
              style={{ width: '100%' }}
            />
          </div>
          </div>
        </div>
      </div>

      <div className="grid">
        {valueSelected === null ? (
          <div className="col-12 text-center">
            <h1>Empieza por buscar algunos iconos</h1>
            <img
              src={Empty}
              alt="empty"
              width={300}
              style={{ backgroundColor: 'var(--blue-400)' }}
            />
          </div>
        ) : listOfIcons.length === 0 ? (
          <IconSkeleton />
        ) : (
          listOfIcons &&
          listOfIcons.map((i, key) => (
            <IconCard
              payload={i}
              key={key}
              getIconToDownload={getIconToDownload}
            />
          ))
        )}
        {listOfIcons.length !== 0 && (
          <div className="col-12 text-center mt-5">
            <Button
              className='p-button-info'
              label="Cargar más iconos..."
              loading={loading}
              onClick={onLoadingClick}
            />
          </div>
        )}
      </div>
    </div>
  );
}
