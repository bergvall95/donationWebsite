class Geocoder {
  /*
  geocoding is powered by nominatim API
  documentation : https://nominatim.org/release-docs/latest/api/Search/
  usage policy : https://operations.osmfoundation.org/policies/nominatim/
  */

  constructor(){
    this.base_url = "https://nominatim.openstreetmap.org/search/"
    this.http_referrer = "" //this should be changed to the website's domain
  }

  async geocode(address){
    /*
    convert an address to a latitude and longitude using the nominatim API
    */

    const query = encodeURI(address)
    const uri = this.base_url + query + "?format=json&limit=1";
    const headers = {
      referrer: this.http_referrer
    }

    const response = await fetch(uri, headers)

    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }

    const response_json = await response.json();
    return [Number(response_json[0].lat), Number(response_json[0].lon)]
  }

}

export default Geocoder
