import { atom } from 'recoil';

export const playlistState = atom({
    key: 'playlistState',
    default: [],
}); 

export const playlistIdState = atom({
    key: 'playlistIdState',
    default: '5jEc78NDSet9Cso6sDCNc6',
});