import kivy
import os
import ctypes
import requests
import threading
import socketio


from time import strftime
from kivy.app import App 
from kivy.clock import Clock
from kivy.uix.floatlayout import FloatLayout
from kivy.core.window import Window
from kivy.uix.popup import Popup
from kivy.core.audio import SoundLoader
from kivy.uix.textinput import TextInput
from kivy.uix.button import Button
from kivy.properties import ObjectProperty
from kivy.uix.label import Label
from kivy.core.text import LabelBase 
from kivy.utils import get_color_from_hex
from kivy.clock import mainthread


class myThread (threading.Thread):
   def __init__(self, threadID, name, counter):
      threading.Thread.__init__(self)
      self.threadID = threadID
      self.name = name
      self.counter = counter

   def run(self):
     
        sio = socketio.Client()

        @sio.event
        def connect():
            print('connection established')


        @sio.event
        def notify(data):
        	 sound=SoundLoader.load('Duy.wav')
        	 sound.play()
        	 popup = Popup(title='A Message',
                content=Label(text=data,font_size=20),
                size_hint=(None, None), size=(400, 250))
        	 popup.open()
        	 

        @sio.event
        def disconnect():
            print('disconnected from server')
            os.system("shutdown /s /t 30")
            App.get_running_app().stop()
            

        sio.connect('https://time-026.herokuapp.com')
        sio.wait()
                
thread1 = myThread(1, "Thread-1", 1)
thread1.start()

class SimplePopup(FloatLayout): 
    pass

class TestApp(App):
    sw_started= True
    sw_seconds = 0
    password=ObjectProperty()
    
    
    def __init__(self, **kwargs):
        super(TestApp, self).__init__(**kwargs)
        Window.bind(on_request_close=self.exit_check)

        
  


    def exit_check(self,kq):
        show=SimplePopup()
        pop_up = Popup(title="Insert Password!", content=show, size_hint=(0.6, 0.3))
        password='admin'
        pop_up.dismiss()
        pop_up.open()
        check=True 
        if(kq==password):
            check=False
            App.get_running_app().stop()
            

        return check

        

    
    def get(self,text):
        self.exit_check(text)
        
    def notice(self):
        show=NotifyPopup()
        pop_up1 = Popup(title="A Message to You!", content=show, size_hint=(.7, 0.2))
        pop_up1.dismiss()
        pop_up1.open()

    def update_time(self, nap):
        if self.sw_started:
            self.sw_seconds += nap
        minutes, seconds = divmod(self.sw_seconds, 60)
        hours, minutes = divmod(minutes, 60)
        self.root.ids.stopwatch.text = (
            '%02d:%02d:%02d'%
            (int(hours), int(minutes), int(seconds))
        )

    def on_start(self):
        Clock.schedule_interval(self.update_time, 0)

    def shut_down(self):
        os.system("shutdown /s /t 30")
        
       
       
    def restart(self):
        os.system("shutdown /r /t 30")

if __name__ == "__main__":
    LabelBase.register(
        name='Roboto',
        fn_regular= 'Roboto-Thin.ttf',
        fn_bold= 'Roboto-Medium.ttf'
    )
    Window.clearcolor=(51/255.0,51/255.0,51/255.0,0.2)
    Window.size = (500, 700)
    x = requests.get('https://time-026.herokuapp.com/start')
    TestApp().run()  
