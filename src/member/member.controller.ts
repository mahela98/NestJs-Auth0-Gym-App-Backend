import { Controller, Get, Res, HttpStatus, Param, NotFoundException, Post, Body, Put, Query, Delete } from '@nestjs/common';
import { MemberService } from './member.service';
import { CreatePostDTO } from './dto/create-post.dto';
import { ValidateObjectId } from './shared/pipes/validate-object-id.pipes';
    
@Controller('blog')
export class BlogController {
    
  constructor(private memberService: MemberService) { }
    
  // Submit a post
  @Post('/post')
  async addPost(@Res() res, @Body() createPostDTO: CreatePostDTO) {
    const newPost = await this.memberService.addPost(createPostDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Post has been submitted successfully!',
      post: newPost,
    });
  }
    
  // Fetch a particular post using ID
  @Get('post/:postID')
  async getPost(@Res() res, @Param('postID', new ValidateObjectId()) postID) {
    const post = await this.memberService.getPost(postID);
    if (!post) {
        throw new NotFoundException('Post does not exist!');
    }
    return res.status(HttpStatus.OK).json(post);
  }
    
  // Fetch all posts
  @Get('posts')
  async getPosts(@Res() res) {
    const posts = await this.memberService.getPosts();
    return res.status(HttpStatus.OK).json(posts);
  }
}