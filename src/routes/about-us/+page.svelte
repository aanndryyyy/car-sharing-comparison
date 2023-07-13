<script>
  import Footer from "$lib/Components/Footer.svelte";
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

    <p>Introduction:</p>

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
      retrieves the most up-to-date location data upon page load, ensuring
      accuracy within a maximum one-minute time frame. If you've been on the
      page for an extended period and want the latest information, simply
      refresh the page.
    </p>
    <p>
      Our application is designed to be user-friendly on both desktop and mobile
      devices. Additionally, we've implemented a bookmarking feature, allowing
      you to add the application to your device main screen for one-click
      access. Follow the steps below to install the application to your device:
    </p>

    <p>On an iOS phone: [Include instructions here.]</p>

    <p>On an Android phone: [Include instructions here.]</p>

    <p>On a computer: [Include instructions here.]</p>

    <p>
      We acknowledge that our current application has room for improvement, and
      we are committed to further development. If you encounter any bugs or
      would like to reach out to us for any other reason, please don't hesitate
      to contact us at something@something.com.
    </p>

    <p>
      We hope you find our application useful and enjoy your shared car
      experience!
    </p>
  </div>
</div>

<Footer />
