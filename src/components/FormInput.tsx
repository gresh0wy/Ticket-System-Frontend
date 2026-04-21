export function FormInput(props) {

    return (
        <>
            <div className='form-group'>
                <label>{props.label}</label>
                <input
                    name={props.name}
                    type={props.type}
                    value={props.value}
                    placeholder={props.placeholder}
                    onChange={props.onChange}
                />
            </div>
        </>
    )
}