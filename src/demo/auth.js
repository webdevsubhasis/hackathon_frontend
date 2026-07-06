export const enableDemo = () => {
    localStorage.setItem("demoMode", "true");
};

export const disableDemo = () => {
    localStorage.removeItem("demoMode");
};

export const isDemo = () => {
    return localStorage.getItem("demoMode") === "true";
};