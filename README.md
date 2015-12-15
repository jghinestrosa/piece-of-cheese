# Piece of Cheese :rat:

**Piece of Cheese** is a game that let you be a rat trying to get some cheese located at the exit of a maze.

## How to play

Use the arrow keys from the keyboard in order to move the rat through the maze.

At the end of the maze a piece of cheese is waiting for you. Eat it and you'll beat the stage.

Unfortunately, you won't have so much time to enjoy your victory since a new maze will be randomly generated right away.

(Mmm... Maybe the playable character should have been a groundhog... Nevermind)

## Some history

I came up with the idea of making a game like this while I was developing another project called [Maze Generator](https://github.com/jghinestrosa/maze-generator).

I was interested to know how to generate random mazes and solve them so, I developed a library that generates them using the Prim algorithm. If you visit the GitHub project repository you will also find an interactive example with the main features I wanted to implement from the beginning.

But I eventually thought that this library would let me develop another kind of application. Maybe a game. Something more visually attractive than a simple black and white maze with an entry and an exit. So, I saw this as an opportunity to make a little game, just for fun.

It's been really useful to me because I had to implement a collision detector, an input handler, a game loop and deal with a spritesheet. Some of this things were new for me, while other things were familiar because I made some little experiments trying to develop games long time ago.

It was also a great opportunity to make the graphics. I love drawing and I'm a pixel art fan so, I decided to make the sprites by myself. They are not the best sprites in the world but, hey, I had to deal with pixels and little image dimensions and all this was new to me! I enjoyed doing it and I think I will keep practising in order to improve my skills.

I'm aware there are some details in the implementation that are wrong but, they will stay that way because it's just for this game. The more I was adding game elements to the code, the more I was thinking about developing a complete engine in order to reuse it for future games. And I probably will.

## External resources

I have used the font [Bangers](https://www.google.com/fonts/specimen/Bangers) from Google Font and Font-Awesome in order to have a volume icon to enable and disable the music.

Thanks to their respective authors! Both resources helped me giving some style to the game.

## Music

The silver lining of having a friend who is a musician and a programmer is that you can ask him for any favor like... composing the soundtrack for your game. **Thank you** [Antonio](https://github.com/antoniovm)!

# License

MIT
