package com.mosquetv;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate; // <- add this necessary import
import org.devio.rn.splashscreen.SplashScreen; // <- add this necessary import



public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "MosqueTv";
  }
      @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new ReactActivityDelegate(this, getMainComponentName()) {

      @Override
      protected void loadApp(String appKey) {
      
          SplashScreen.show(MainActivity.this);  // here
         // <- initialize the splash screen
        super.loadApp(appKey);
      }
    };
  }
 
}
