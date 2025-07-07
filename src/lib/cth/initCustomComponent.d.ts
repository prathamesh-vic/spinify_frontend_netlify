import { createClient, SettingsMessage, TrackEvent } from './customComponentClient';
export interface Configuration {
    client?: ReturnType<typeof createClient>;
    syncHeight?: boolean;
}
export interface CustomComponent {
    state: SettingsMessage['data'];
    signalContentLoaded: () => void;
    guestDocumentHeight: (height: string) => void;
    onHelpPillClick: (callback: () => void) => () => void;
    signalHelpWidgetChange: (state: {
        isOpen: boolean;
    }) => void;
    track: (e: TrackEvent) => void;
}
export default function initCustomComponent(config?: Configuration): Promise<CustomComponent>;
