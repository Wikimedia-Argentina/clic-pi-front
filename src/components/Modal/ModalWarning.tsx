type Props = {
    mostrarTexto: () => void;
}

function ModalWarning({ mostrarTexto }: Props) {
    return (
        <div className="absolute  z-50 top-1/2 left-1/2 transform -translate-x-1/2  text-center p-4  bg-white text-sm w-[450px] rounded-xl border border-gray-500">
            <p className=" text-base py-4 ">Para Verificar la obra, se considerará al colaborador con fecha de fallecimiento más reciente.
            </p>
            <div onClick={mostrarTexto} className="p-2 my-5 w-60  cursor-pointer mx-auto bg-black rounded-lg text-sm  text-white " >Aceptar</div>
        </div>
    );
}
export default ModalWarning;