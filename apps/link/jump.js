try {
  document.title = 'Redirecting page';
  location.replace(
    document.getElementById('refresh').content.split(';')[1].split('=')[1]
  );
} catch (e) {
  if (document.referrer != '') {
    location.replace(document.referrer);
  }
}
