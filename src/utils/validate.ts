export const imgValidate = (e: React.ChangeEvent<any>) => {
    const {
        target: { files, validity }
    } = e;

    if (
        !validity ||
        !files ||
        files.length !== 1 ||
        !files[0]
    ) {
        return false;
    }

    const file = files[0];
    if (!file || !file.type) {
        return false;
    }
    return true;
}

export const removeSpecialChar = (str: string) => {
    const filteredName = str.replace(
        /!@#$%^&*(),?"{}|<>:/gi,
        "_"
    );
    return filteredName;
}