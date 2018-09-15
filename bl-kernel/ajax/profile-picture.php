<?php defined('BLUDIT') or die('Bludit CMS.');
header('Content-Type: application/json');

if (!isset($_FILES['profilePictureInputFile'])) {
	exit (json_encode(array(
		'status'=>1,
		'message'=>'Error trying to upload the profile picture.'
	)));
}

// File extension
$fileExtension 	= pathinfo($_FILES['profilePictureInputFile']['name'], PATHINFO_EXTENSION);
// Username who is uploading the image
$username = $login->username();
// Tmp filename
$tmpFilename = $username.'.'.$fileExtension;
// Final filename
$filename = $username.'.png';

// Move from temporary directory to uploads folder
rename($_FILES['profilePictureInputFile']['tmp_name'], PATH_TMP.$tmpFilename);

// Resize and convert to png
$image = new Image();
$image->setImage(PATH_TMP.$tmpFilename, PROFILE_IMG_WIDTH, PROFILE_IMG_HEIGHT, 'crop');
$image->saveImage(PATH_UPLOADS_PROFILES.$filename, PROFILE_IMG_QUALITY, false, true);

// Remove the tmp file
unlink(PATH_TMP.$tmpFilename);

// Permissions
chmod(PATH_UPLOADS_PROFILES.$filename, 0644);

exit (json_encode(array(
	'status'=>0,
	'message'=>'Image uploaded success.',
	'filename'=>$filename,
	'absoluteURL'=>DOMAIN_UPLOADS_PROFILES.$filename,
	'absolutePath'=>PATH_UPLOADS_PROFILES.$filename
)));

?>