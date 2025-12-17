export const ToggleField = (setState,field) => {
    setState((prev) => ({
        ...prev,
        [field]: !prev[field],
}))}