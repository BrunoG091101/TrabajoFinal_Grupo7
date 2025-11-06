import '../../../assets/css/P01_GASPAR.css'
import logoP01_G from "../../../assets/image/Proy01_GASPAR/logoP01_G.jpg";
import microP01_G from "../../../assets/image/Proy01_GASPAR/microP01_G.jpg";
import ramP01_G from "../../../assets/image/Proy01_GASPAR/ramP01_G.jpeg";
import placaMadreP01_G from "../../../assets/image/Proy01_GASPAR/placaMadreP01_G.jpg";
import discoP01_G from "../../../assets/image/Proy01_GASPAR/discoP01_G.jpg";
import gabineteP01_G from "../../../assets/image/Proy01_GASPAR/gabineteP01_G.jpg";
import monitorP01_G from "../../../assets/image/Proy01_GASPAR/monitorP01_G.jpg";
import mouseP01_G from "../../../assets/image/Proy01_GASPAR/mouseP01_G.jpg";
import tecladoP01_G from "../../../assets/image/Proy01_GASPAR/tecladoP01_G.jpg";

function PagPrin_G() {
    return(
        <div class="contenedorP01_G">
            <div class="encabezado">
                <img
                src={logoP01_G}
                alt="logo"
                width="120"
                height="113"
                className="logoP01_G"
                />

                <h1 class="empresa">
                    TK Interactive
                </h1>
            </div>

            <div class="menu">
                <h2 class="opcionesMenu"> Inicio </h2>
                <h2 class="opcionesMenu"> Catálogo </h2>
                <h2 class="opcionesMenu"> Ofertas </h2>
                <h2 class="opcionesMenu"> Blog </h2>
                <h2 class="opcionesMenu"> Registrarse </h2>
            </div>

            <div class="productos">
                <div class="lateral">
                    <h2 class="opcionesLateral"> Armá tu PC </h2>
                    <h2 class="opcionesLateral">Componentes de PC </h2>
                    <h2 class="opcionesLateral"> Notebook </h2>
                    <h2 class="opcionesLateral"> Monitores </h2>
                    <h2 class="opcionesLateral"> Periféricos </h2>
                    <h2 class="opcionesLateral"> Cables y conectividad </h2>
                    <h2 class="opcionesLateral"> Telefonía </h2>
                </div>

                <div class="inventario">
                    <div class="producto">
                        <img
                        src={microP01_G}
                        alt="producto01"
                        width="180"
                        height="180"
                        className="imagenProducto"
                        />

                        <h3 class="nombreProducto">Microprocesador AMD Ryzen 5 4600G</h3>
                        <h2 class="precioProducto">$140.000</h2>
                    </div>

                    <div class="producto">
                        <img
                        src={ramP01_G}
                        alt="producto02"
                        width="180"
                        height="180"
                        className="imagenProducto"
                        />

                        <h3 class="nombreProducto">Memoria RAM Kingston Fury Beast 8GB DDR4 x2</h3>
                        <h2 class="precioProducto">$80.000</h2>
                    </div>

                    <div class="producto">
                        <img
                        src={placaMadreP01_G}
                        alt="producto03"
                        width="180"
                        height="180"
                        className="imagenProducto"
                        />

                        <h3 class="nombreProducto">Placa Madre ASUS Prime B450M-A II</h3>
                        <h2 class="precioProducto">$125.000</h2>
                    </div>

                    <div class="producto">
                        <img
                        src={discoP01_G}
                        alt="producto04"
                        width="180"
                        height="180"
                        className="imagenProducto"
                        />

                        <h3 class="nombreProducto">Disco sólido Kingston 240GB</h3>
                        <h2 class="precioProducto">$50.000</h2>
                    </div>

                    <div class="producto">
                        <img
                        src={gabineteP01_G}
                        alt="producto05"
                        width="180"
                        height="180"
                        className="imagenProducto"
                        />

                        <h3 class="nombreProducto">Gabinete Thermaltake Divider 170 TG ARGB</h3>
                        <h2 class="precioProducto">$120.000</h2>
                    </div>

                    <div class="producto">
                        <img
                        src={monitorP01_G}
                        alt="producto06"
                        width="180"
                        height="180"
                        className="imagenProducto"
                        />

                        <h3 class="nombreProducto">Monitor CHiQ 24F650 23.8" FHD 75Hz</h3>
                        <h2 class="precioProducto">$150.000</h2>
                    </div>

                    <div class="producto">
                        <img
                        src={mouseP01_G}
                        alt="producto07"
                        width="180"
                        height="180"
                        className="imagenProducto"
                        />

                        <h3 class="nombreProducto">Mouse Inalámbrico Logitech G305 Lightspeed</h3>
                        <h2 class="precioProducto">$50.000</h2>
                    </div>

                    <div class="producto">
                        <img
                        src={tecladoP01_G}
                        alt="producto08"
                        width="180"
                        height="180"
                        className="imagenProducto"
                        />

                        <h3 class="nombreProducto">Teclado Redragon Waveimpact S103</h3>
                        <h2 class="precioProducto">$30.000</h2>
                    </div>
                </div>
            </div>

            <div class="pie">
                <div class="interes">
                    <h2 class="categoriaPie"> Informacion </h2>
                    <h3 class="opcionesCat"> Empresa </h3>
                    <h3 class="opcionesCat"> Contacto </h3>
                </div>

                <div class="interes">
                    <h2 class="categoriaPie"> Enlaces útiles </h2>
                    <h3 class="opcionesCat"> Garantías </h3>
                    <h3 class="opcionesCat"> Formas de pago </h3>
                </div>

                <div class="interes">
                    <h2 class="categoriaPie"> Novedades </h2>
                    <h3 class="opcionesCat"> Suscripción </h3>
                    <h3 class="opcionesCat"> Blog </h3>
                </div>

                <div class="interes">
                    <h2 class="categoriaPie"> Atención </h2>
                    <h3 class="opcionesCat"> Lun a Vie 8:30 a 12:30 y de 16:30 a 20:30 </h3>
                    <h3 class="opcionesCat"> Sáb 8:30 a 13 </h3>
                </div>

                <div class="interes dev">
                    <h2 class="categoriaPie"> Desarrollado por </h2>
                    <h3 class="opcionesCat"> Bruno Ramiro Gaspar </h3>
                </div>
            </div>
        </div>
    )
}
export default PagPrin_G