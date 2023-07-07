import { Link, useLocation } from 'react-router-dom';
import iconHome from '../../public/images/icons/ico-home.png'
import { useEffect, useState } from 'react';
import { useWidth } from '../hooks/use-width';

interface Ruta {
  nombre: string;
  url: string;
}
function BreadcrumbComponent()  {

  const { width } = useWidth();
  let { pathname } = useLocation();
  const [arregloRutaActual, setArregloRutaActual] = useState<Ruta[]>([]);

  useEffect(() => {
    const rutaActual = pathname.split('/').filter((item) => item);
    const rutaConUrl = rutaActual.map((item, index) => {
      if (index === 0) {
        return { nombre: item, url: `/${item}` };
      } else {
        const rutaAnterior = rutaActual.slice(0, index).join('/');
        return { nombre: item, url: `/${rutaAnterior}/${item}` };
      }
    });
  
    setArregloRutaActual(rutaConUrl);
  }, [pathname]);


  return (
    <>
      {
        width >= 1024 ?
          <div className='content-breadcrumb'>
            <ul id="breadcrumb" data-testid='breadcrumb'>
              <li>
                <Link to="/" className='inicio_miga_de_pan' id='miga_inicio' data-testid='miga_inicio'>
                  <img src={iconHome} alt='Inicio' data-testid='icon_home' id='icon_home' />
                </Link>
              </li>
                {
                  arregloRutaActual.map((item) => {
                    return (
                      <li key={item.nombre}>
                        <p>/</p>
                        <Link to={item.url} className='miga_de_pan' id={`miga_${item.nombre}`} data-testid={`miga_${item.nombre}`}>
                          {item.nombre}
                        </Link>
                      </li>
                    )
                  })
                  
                }
            </ul>
          </div>
        :
          <></>
      }
    </>
  )
}

export default BreadcrumbComponent