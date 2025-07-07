var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import animationFrameInterval from './animationFrameInterval';
import calcDocumentSize from './calcDocumentSize';
import { createClient, } from './customComponentClient';
export default function initCustomComponent() {
    return __awaiter(this, arguments, void 0, function* (config = {}) {
        const { client = createClient(), syncHeight = true } = config;
        // attach handshake event handlers before calling client.connect()
        const promises = {
            windowId: client.emitter.once('windowId'),
            settings: client.emitter.once('settings'),
        };
        client.connect();
        const { parentWindowId } = yield promises.windowId;
        client.postMessage({
            guestReadyToReceiveMessages: true,
            parentWindowId,
        });
        const state = yield promises.settings;
        const customComponent = {
            state,
            signalContentLoaded() {
                client.postMessage({
                    guestContentLoaded: true,
                    parentWindowId,
                });
            },
            guestDocumentHeight(height) {
                client.postMessage({
                    guestDocumentSize: height,
                    parentWindowId,
                });
            },
            onHelpPillClick(callback) {
                return client.emitter.on('onHelpPillClick', callback);
            },
            signalHelpWidgetChange({ isOpen }) {
                client.postMessage({
                    isHelpWidgetOpen: isOpen,
                    parentWindowId,
                });
            },
            track(e) {
                client.postMessage({
                    trackEvent: e,
                    parentWindowId,
                });
            },
        };
        if (syncHeight) {
            let lastHeight;
            animationFrameInterval(() => {
                const { height } = calcDocumentSize();
                if (lastHeight === height)
                    return;
                customComponent.guestDocumentHeight(`${height}px`);
                lastHeight = height;
            });
        }
        return customComponent;
    });
}
