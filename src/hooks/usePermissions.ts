import React, { useState, useEffect } from 'react';
import useAxios from '@/hooks/useAxios';
import { useAuth } from '@/contexts/AuthContext';

type Props = {};

const usePermissions = () => {
    const { user } = useAuth();
    const { post } = useAxios();
    const [tried, setTried] = useState(false);
    const [currentAbilities, setCurrentAbilities] = useState<any>();

    useEffect(() => {
        if (tried === false && user) {
            const fetchPermissions = async () => {
                try {
                    const resp = await post('/abilities', { abilities: currentAbilities });
                    setCurrentAbilities(resp || null); // Assuming the response will be an array of abilities.
                } catch (error) {
                    console.error(error);
                    setCurrentAbilities(null); // Reset the current abilities on error.
                }
                setTried(true);
            };

            fetchPermissions();
        }
    }, [tried, user, currentAbilities]);

    const testAbilities = (abilities: string | string[]) => {
        if (Array.isArray(abilities)) {
            setCurrentAbilities(abilities);
        } else {
            setCurrentAbilities([abilities]);
        }
        setTried(false); // Reset the "tried" state to allow a new API call for the new abilities.
    };

    const can = (ability: string) => Object.keys(currentAbilities || {}).length > 0 ? currentAbilities[ability] : false

    return { can, testAbilities };
};

export default usePermissions;
