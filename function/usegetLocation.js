import React, { useState, useEffect } from 'react';
import { getCurrentPositionAsync, requestForegroundPermissionsAsync } from 'expo-location';

export default function usegetLocation() {
    const [location, setLocation] = useState(null);

    useEffect(() => {
        const getLocation = async () => {
            const { status } = await requestForegroundPermissionsAsync();
            if (status === "granted") {
                try {
                    const currentLocation = await getCurrentPositionAsync({});
                    setLocation({ lat: currentLocation.coords.latitude, lng: currentLocation.coords.longitude });
                } catch (error) {
                    console.error('Error getting location:', error);
                    setLocation({ lat: null, lng: null });
                }
            } else {
                console.warn('Location permission not granted');
                setLocation({ lat: 30.5, lng: 31.5 });
            }
        };
        getLocation();
    }, []);

    return { location };
}
