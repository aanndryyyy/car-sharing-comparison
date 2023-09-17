<script>
  import Footer from '$lib/Components/Footer.svelte'

  import IOS_PWA_1 from '../../assets/images/instructions/IOS/ios-pwa-1.png?url&format=webp'
  import IOS_PWA_2 from '../../assets/images/instructions/IOS/ios-pwa-2.png?url&format=webp'
  import IOS_PWA_3 from '../../assets/images/instructions/IOS/ios-pwa-3.png?url&format=webp'
  import IOS_PWA_4 from '../../assets/images/instructions/IOS/ios-pwa-4.png?url&format=webp'
  import PC_PWA_1 from '../../assets/images/instructions/PC/pc-pwa-1.png?url&format=webp'
  import PC_PWA_2 from '../../assets/images/instructions/PC/pc-pwa-2.png?url&format=webp'
  import android_PWA_1 from '../../assets/images/instructions/android/android-pwa-1.png?url&format=webp'
  import android_PWA_2 from '../../assets/images/instructions/android/android-pwa-2.png?url&format=webp'
  import android_PWA_3 from '../../assets/images/instructions/android/android-pwa-3.png?url&format=webp'
</script>

<div class="flex justify-center p-8">
  <div class="grid max-w-lg gap-6">
    <p>
      Welcome to our website! Here, you'll find a powerful calculator that helps
      you choose the optimal service provider for your shared car trip.
      Currently, our services are available only in the Estonian market. We
      provide detailed pricing information for four different service providers,
      two of which Bolt and CityBee also offer real-time car location
      availability.
    </p>

    <p>Introductions:</p>

    <p>
      Using our application is straightforward and depends on the specific
      information you're looking for. If you're interested in car price
      information, begin by filling out the planner input fields. You have two
      planning options to choose from. The first is an automatic planner, which
      requires you to enter the start and end locations of your trip. You can
      also add stopovers to your journey and indicate if it's a round trip,
      which doubles the marked distance. Alternatively, you can choose manual
      planner, where you input the duration of your drive and the distance
      you'll cover during that time.
    </p>

    <p>
      In the car list, you'll find detailed information about each vehicle,
      including the car model name, service provider name, price per minute,
      price per kilometer, and the total estimated price. If you sort the list
      based on proximity when selecting a car, the car map will display the
      distance between your location and the available cars from a bird's eye
      view. Clicking on the map will enlarge it, providing more detailed
      information about the selected car and a button that will redirect you to
      the corresponding service provider's application.
    </p>

    <p>
      Another essential feature is the live map view, which displays the
      real-time locations of available service providers' cars. The application
      retrieves the most up-to-date location data upon page load and itself
      automatically downloads the latest data every minute.
    </p>
    <p>
      Our application is designed to be user-friendly on both desktop and mobile
      devices. Additionally, we've implemented a bookmarking feature, allowing
      you to add the application to your device main screen for one-click
      access. Follow the steps below to install the application to your device:
    </p>

    <p>On an iOS phone:</p>
    <div class="mb-8 flex flex-wrap gap-2">
      <img width="200" src={IOS_PWA_1} alt="IOS PWA 1" />
      <img width="200" src={IOS_PWA_2} alt="IOS PWA 2" />
      <img width="200" src={IOS_PWA_3} alt="IOS PWA 3" />
      <img width="200" src={IOS_PWA_4} alt="IOS PWA 4" />
    </div>

    <p>On an Android phone:</p>
    <div class="mb-8 flex flex-wrap gap-2">
      <img width="200" src={android_PWA_1} alt="Android PWA 1" />
      <img width="200" src={android_PWA_2} alt="Android PWA 2" />
      <img width="200" src={android_PWA_3} alt="Android PWA 3" />
    </div>

    <p>On a computer:</p>
    <div class="mb-8 grid gap-2">
      <img src={PC_PWA_1} alt="PC PWA 1" />
      <img src={PC_PWA_2} alt="PC PWA 2" />
    </div>

    <p>
      We acknowledge that our current application has room for improvement, and
      we are committed to further development. If you encounter any bugs or
      would like to reach out to us for any other reason, please don't hesitate
      to contact us at info.rentalize@gmail.com.
    </p>

    <p>
      We hope you find our application useful and enjoy your shared car
      experience!
    </p>
  </div>
</div>

<Footer />
