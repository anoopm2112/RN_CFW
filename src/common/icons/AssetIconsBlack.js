import React from 'react';
import { Image } from 'react-native';

const IconProvider = (source) => ({
    toReactElement: ({ animation, ...props }) => (
        <Image {...props} source={source} />
    ),
});

const AssetIconsPack = {
    name: 'assets',
    icons: {
        'male': IconProvider(require('../../../assets/img/black/male.png')),
        'female': IconProvider(require('../../../assets/img/black/female.png')),
        'default_app_login_icon': IconProvider(require('../../../assets/img/black/cfw-logo.png')),
        'otp': IconProvider(require('../../../assets/img/black/otp.png')),
        'about-us': IconProvider(require('../../../assets/img/black/about-us.png')),
        'kunjaapp_app_login_icon': IconProvider(require('../../../assets/img/black/cfw-logo.png')),
        'uploadImage': require('../../../assets/img/black/upload-image.png'),
        'camera': require('../../../assets/img/black/camera.png'),
        'brokenImage': require('../../../assets/img/black/brokenImage.png')
    },
};

export default AssetIconsPack;
