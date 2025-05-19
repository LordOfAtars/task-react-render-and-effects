import React, { useEffect, useState } from 'react';
import { subscribe, unsubscribe } from './resources/API';

interface Props {
    sourceId: string;
}

export function Effects({ sourceId }: Props) {
    const [lastMessage, setLastMessage] = useState(-1);

    const handleNewMessage = (message: number | null) => {
        if (message !== null && message !== undefined) {
            setLastMessage(message);
        }
    };

    useEffect(() => {
        const currentSourceId = sourceId;

        subscribe(currentSourceId, handleNewMessage);

        setLastMessage(-1);

        return () => {
            unsubscribe(currentSourceId, handleNewMessage);
        };
    }, [sourceId]);

    return <div>{`${sourceId}: ${lastMessage}`}</div>;
}
