import Realm from 'realm';

const schemas = [];

const defaultConfig = { schema: schemas, schemaVersion: 1 };

const container = {
    realm: undefined
};

export default container;

export const getInstance = (encryptionKey) => {
    const encryptedConfig = { ...defaultConfig, path: 'encrypted.realm', encryptionKey };
    if (!Realm.exists(encryptedConfig)) {
        const defaultRealm = new Realm(defaultConfig);
        const newPath = Realm.defaultPath.substring(0, Realm.defaultPath.lastIndexOf("/") + 1) + 'encrypted.realm';
        defaultRealm.writeCopyTo(newPath, encryptionKey);
        defaultRealm.close();
        Realm.deleteFile(defaultConfig);
    }
    container.realm = new Realm(encryptedConfig);
}

export const removeInstance = (encryptionKey) => {
    const encryptedConfig = { ...defaultConfig, path: 'encrypted.realm', encryptionKey };
    const { realm } = container;
    if (realm) {
        realm.close();
        Realm.deleteFile(encryptedConfig);
        container.realm = undefined;
    }
}

export const resetInstance = (encryptionKey) => {
    const encryptedConfig = { ...defaultConfig, path: 'encrypted.realm', encryptionKey };
    if (Realm.exists(encryptedConfig)) {
        const encryptedRealm = new Realm(encryptedConfig);
        const newPath = Realm.defaultPath;
        encryptedRealm.writeCopyTo(newPath);
        encryptedRealm.close();
        Realm.deleteFile(encryptedRealm);
        container.realm = undefined;
    }
}
