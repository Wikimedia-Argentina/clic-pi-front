

type colaboradorActual = {
    nombre: string,
    productor: string,
    director: string,
    compositor: string,
    aliveValue: string,
    deathDate: string

}

interface Props {
    labelTitle: string
    colaborador: colaboradorActual
    setColaboradorActual: React.Dispatch<React.SetStateAction<colaboradorActual>>;
    type?: keyof colaboradorActual;
}

function Label({ labelTitle, setColaboradorActual, colaborador, type }: Props) {
    return (
        <div>
            <div className="flex relative py-2">
                <label className="w-[100%] text-center text-sm " >{labelTitle}</label>
                <span className="right-3 text-red-500 absolute text-xl">*</span>
            </div>
            <input required
                onChange={(e) =>
                    setColaboradorActual({
                        ...colaborador,
                        [type as keyof colaboradorActual]: e.target.value,
                    })
                }
                className="bg-transparent border border-gray-500 rounded-lg w-full p-2"
                value={type ? colaborador[type] : ''} />
        </div>
    )
}

export default Label;