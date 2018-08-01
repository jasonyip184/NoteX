import React from 'react';
import { StackNavigator } from 'react-navigation';
import Splash from './screens/Splash';
import Home from './screens/Home';
import ShareFile from './screens/ShareFile';
import SketchJob from './screens/SketchJob';
import Notes from './screens/Notes';
import EditNote from './screens/EditNote';

const App = StackNavigator({
    Splash: { screen: Splash },
    Home: { screen: Home },
    ShareFile: { screen: ShareFile },
    SketchJob: { screen: SketchJob },
    Notes: { screen: Notes },
    EditNote: { screen: EditNote },
});

export default App;
