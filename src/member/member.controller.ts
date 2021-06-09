import { Controller, Get, Res, HttpStatus, Param, NotFoundException, Post, Body, Put, Query, Delete } from '@nestjs/common';
import { MemberService } from './member.service';
import { CreatePostDTO } from './dto/create-post.dto';
import { ValidateObjectId } from './shared/pipes/validate-object-id.pipes';
    
@Controller('member')
export class MemberController {
    
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

   // Edit a particular post using ID
   @Put('/edit')
   async editPost(
     @Res() res,
     @Query('postID', new ValidateObjectId()) postID,
     @Body() createPostDTO: CreatePostDTO,
   ) {
     const editedPost = await this.memberService.editPost(postID, createPostDTO);
     if (!editedPost) {
         throw new NotFoundException('Post does not exist!');
     }
     return res.status(HttpStatus.OK).json({
       message: 'Post has been successfully updated',
       post: editedPost,
     });
   }

    // Delete a post using ID
    @Delete('/delete')
    async deletePost(@Res() res, @Query('postID', new ValidateObjectId()) postID) {
      const deletedPost = await this.memberService.deletePost(postID);
      if (!deletedPost) {
          throw new NotFoundException('Post does not exist!');
      }
      return res.status(HttpStatus.OK).json({
        message: 'Post has been deleted!',
        post: deletedPost,
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