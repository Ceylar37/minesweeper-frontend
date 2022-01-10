import React from 'react';
import {useForm} from "react-hook-form";
import styles from './CustomDifficultForm.module.css'
import {message} from "antd";
import {ICreateField} from "../../models/Field";

interface IProps {
    refreshGame: (newField?: ICreateField) => void
}

const CustomDifficultForm: React.FC<IProps> = ({refreshGame}) => {

    const {register, handleSubmit} = useForm()

    const onSubmit = (values: { height: string, mines: string, width: string }) => {
        const width = Number(values.width)
        const height = Number(values.height)
        const mines = Number(values.mines)
        if (isNaN(width))
            return message.error({content: 'Width must be a number', duration: 3, className: styles.message})
        if (isNaN(height))
            return message.error({content: 'Height must be a number', duration: 3, className: styles.message})
        if (isNaN(mines))
            return message.error({content: 'Mines must be a number', duration: 3, className: styles.message})
        if (width < 5)
            return message.error({content: 'Minimum width: 5', duration: 3, className: styles.message})
        if (width < 5)
            return message.error({content: 'Minimum height: 5', duration: 3, className: styles.message})
        if (width > 40)
            return message.error({content: 'Maximum width: 40', duration: 3, className: styles.message})
        if (width > 40)
            return message.error({content: 'Maximum height: 40', duration: 3, className: styles.message})
        if (mines < 1)
            return message.error({content: 'Minimum number of mines: 1', duration: 3, className: styles.message})
        if (mines > width * height - 1)
            return message.error({content: `Maximum number of mines: ${width * height - 1}`, duration: 3, className: styles.message})
        return refreshGame({width, mines, height})
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <span style={{color: "white", marginLeft: 25, marginRight: 5, fontWeight: "bold"}}>Width</span>
            <input className={styles.inpField} placeholder={'Width'} {...register('width',)}/>
            <span style={{color: "white", marginLeft: 25, marginRight: 5, fontWeight: "bold"}}>Height</span>
            <input className={styles.inpField} placeholder={'Height'} {...register('height',)}/>
            <span style={{color: "white", marginLeft: 25, marginRight: 5, fontWeight: "bold"}}>Mines</span>
            <input className={styles.inpField} placeholder={'Mines'} {...register('mines',)}/>
            <button className={styles.inpField} type={'submit'}
                    style={{marginLeft: 25, display: "flex", alignItems: 'center'}}>
                <span>
                    New Game
                </span>
            </button>
        </form>
    );
};

export default CustomDifficultForm;