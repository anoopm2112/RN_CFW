import ImagePicker from 'react-native-image-crop-picker';
import ImageResizer from 'react-native-image-resizer';
var RNFS = require('react-native-fs');
let quality = 100;
let imageUrl = '';
let orgUriSize = '';
let IMG_SIZE = 200000;
let photo; '';

export function pickImage() {
    renderPickImage();
}

export const renderPickImage = async () => {
    console.tron.log('renderPickImage');
    // const checkStatus = await permissionCheck();
    // if (checkStatus) {
    return imagePickData();
    // } else {
    //     await permissionRequest();
    // }
}

export const imagePickData = async () => {
    console.tron.log('imagePickData');
    ImagePicker.openPicker({
        cropping: true
    }).then(image => {
        RNFS.stat(image.path).then((stats) => {
            console.tron.log('image', image);
            // setImageUrl(image.path);
            // setOrgUriSize(stats.size)
            imageUrl = image.path;
            orgUriSize = stats.size;
            return getResizedImage(imageUrl, quality, orgUriSize);
        }).catch((err) => {
            console.tron.log('err', err);
            // return Alert.alert(
            //     I18n.t('something_wrong')
            // );
        });
    }).catch((error) => {
        if (error.code === 'E_PICKER_CANCELLED') {
            return false;
        }
    });
}

export const getResizedImage = (uri, quality, orgUriSize) => {
    console.tron.log('getResizedImage');
    if (orgUriSize <= IMG_SIZE) {
        console.tron.log('if');
        //check image original size < 200 kb then do not compress
        let ii = imageConvertion(uri, null);
        console.tron.log('ii', ii);
    } else {
        console.tron.log('else');
        ImageResizer.createResizedImage(uri, 1280, 720, "JPEG", quality, 0) //HxW
            .then(response => {
                console.tron.log('responseresponse', response);
                if (quality < 75) { //throw error
                    removeCacheImage(imageUrl);
                    // return Alert.alert(
                    //     I18n.t('something_wrong')
                    // );
                }
                if (response.size >= IMG_SIZE) { //if size is greater than 200kb, then reduce quality
                    // setQuality(...quality, quality--);
                    quality--;
                    return getResizedImage(uri, quality, orgUriSize);
                } else {
                    return imageConvertion(response.uri, uri);
                }
            })
            .catch(err => {
                // return Alert.alert(
                //     I18n.t('something_wrong')
                // );
            });
    }
}

export const imageConvertion = (compressUri, uri) => {
    console.tron.log('imageConvertion');
    let ph = '';
    RNFS.readFile(compressUri, 'base64').then(res => {
        RNFS.exists(compressUri).then((result) => {
            if (result) {
                return RNFS.unlink(compressUri).then(() => {
                    uri && RNFS.unlink(uri).then(() => {
                    });

                    ph = res;
                    console.tron.log('******ph********', ph);
                    return ph;
                    // props.onImageTaken(res);
                    // return res;
                }).catch((err) => { });
            }
            
        }).catch((err) => { });
    });
    
}

export const removeCacheImage = (uri) => {
    // setImageUrl('');
    RNFS.exists(uri).then((result) => {
        if (result) {
            return RNFS.unlink(uri).then(() => {
                // setImageUrl('');
            }).catch((err) => {
            });
        }
    }).catch((err) => { });
}