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
        'male': IconProvider(require('../../../assets/img/blue/male.png')),
        'female': IconProvider(require('../../../assets/img/blue/female.png')),
        'default_app_login_icon': IconProvider(require('../../../assets/img/blue/trois-logo.png')),
        'otp': IconProvider(require('../../../assets/img/blue/otp.png')),
        'about-us': IconProvider(require('../../../assets/img/blue/about-us.png')),
        'uploadImage': require('../../../assets/img/blue/upload-image.png'),
        'camera': require('../../../assets/img/blue/camera.png'),
        'brokenImage': require('../../../assets/img/blue/brokenImage.png')
    },
};

export default AssetIconsPack;
