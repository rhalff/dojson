Do JSON
======

To Process JSON Something has to happen.

This is the something.

It iterates the entire json and
provides executes a callback function per key.

You can also add just one function.

The Values are processed according to it's type

Only one function is added per type.

By default nothing is processed, so you will get
an empty object in return.

If you only specify a string function you
will get an object with only string values.

This seems to work a lot like JSON.parse(.., [revive])
It works a bit different but almost the same.
Besides that JSON.parse expects a string (too bad)

Also there is a difference where DoJSON remembers it's
parents. so the callback can search both ways,
by using this.up.up.up etc. Forward search is natural

Maybe .up could be changed to the actual key names.

this.parentKey.thatParentskey etc.

Downside, you have to know the parent. but this is good
actually. what callback wants to act on something unknown anyway.

forward is:
val.key.deeper.key.

because when a value is an object, the forward is
in the value itself.
