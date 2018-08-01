package com.noteapp;

import org.reactnative.camera.RNCameraPackage;
import android.app.Application;
import com.facebook.react.ReactApplication;
import com.brentvatne.react.ReactVideoPackage;
import com.brentvatne.react.ReactVideoPackage;
import im.shimo.react.prompt.RNPromptPackage;
import com.rssignaturecapture.RSSignatureCapturePackage;
import com.wmjmc.reactspeech.VoicePackage;
import cl.json.RNSharePackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import java.util.Arrays;
import java.util.List;
import cl.json.ShareApplication;


public class MainApplication extends Application implements ShareApplication, ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new ReactVideoPackage(),
            new ReactVideoPackage(),
            new RNPromptPackage(),
            new RSSignatureCapturePackage(),
            new VoicePackage(),
            new RNSharePackage(),
            new RNCameraPackage(),
            new PickerPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }

  @Override
   public String getFileProviderAuthority() {
     return "com.noteapp.provider";
   }
}
