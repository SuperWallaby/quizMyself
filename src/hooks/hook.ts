import React, { useState } from "react";
import { IToastProps } from "../atom/Toast"


export interface IUseModal<T = any> {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    open: boolean;
    openModal: (info: T) => void;
    closeModal: () => void;
    info: T | undefined;
}

export const useToast = () => {
    const [toastOps, setToastOps] = useState<IToastProps>();


    const close = () => {
        setToastOps({ ...toastOps!, open: false })
    }

    const toastHandle = (options: IToastProps) => {
        options.onClose = close;
        setToastOps(options);
    }

    return { toastOps, toastHandle, close }
}

export function useModal<T = any>(): IUseModal<T> {
    const [info, setInfo] = useState<T>();
    const [open, setOpen] = React.useState(false);
    const openModal = (info: any) => {

        setInfo(info);
        setOpen(true);
    };

    const closeModal = () => {
        setOpen(false);
    };

    return { info, setOpen, open, openModal, closeModal }
}