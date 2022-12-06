export default function setKeyListeners(setKbCheck, setMsCheck) {
   

    document.addEventListener('keydown', (e) => {
        setKbCheck((keys) => {
            const key = e.key.toLowerCase();
            if (!keys.includes(key)) {
               
               return [...keys, key]
            } else {
                return keys
            }
        })
    
    });

    document.addEventListener('keyup', (e) => {
        setKbCheck((keys) => {
            const key = e.key.toLowerCase();
        if (keys.includes(key)) {
        const newKeys = keys.filter((thisKey) => thisKey !== key);
        return newKeys;} else { 
            return keys
        }
        })
    });

    document.addEventListener('mousemove', (e) => {
        setMsCheck(e)
    })

}